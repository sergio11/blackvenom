import os
from netfilterqueue import NetfilterQueue
import subprocess
import threading
from scapy.all import IP, PcapWriter
import time

class PacketLogger:
    """
    A class to configure NetfilterQueue for packet interception and saving packets to a pcap file.

    Attributes:
        queue_num (int): The queue number for NetfilterQueue.
        nfqueue (NetfilterQueue): Instance of the NetfilterQueue for packet interception.
        running (bool): A flag to indicate if the logger is running.
        thread (threading.Thread): The thread handling the packet logging.
        pcap_file (str): The path to the pcap file where packets are saved.
        pcap_writer (PcapWriter): PcapWriter instance for appending packets directly to file.
    """

    def __init__(self, queue_num=1, pcap_file="captured_packets.pcap"):
        """
        Initializes the PacketLogger.

        Args:
            queue_num (int): The queue number for NetfilterQueue (default is 1).
            pcap_file (str): Path to the pcap file for storing intercepted packets.
        """
        self.queue_num = queue_num
        self.pcap_file = pcap_file
        self.nfqueue = NetfilterQueue()
        self.running = False
        self.thread = None
        # Initialize the pcap file
        self._initialize_pcap_file()

        # Initialize PcapWriter for appending packets to file directly
        self.pcap_writer = PcapWriter(self.pcap_file, append=True, sync=True)

    def start(self):
        """Starts the packet logging process."""
        self._run_iptables()  # Set up iptables rules before starting logging
        self.running = True
        print(f"📡 Logging packets on queue {self.queue_num} and saving to {self.pcap_file}...")
        self.thread = threading.Thread(target=self._run_logger)
        self.thread.start()

    def stop(self):
        """Stops the packet logging process and closes the pcap file."""
        print("🛑 Stopping packet logging...")
        self.running = False
        if self.thread:
            self.thread.join()  # Wait for the logger thread to finish
        self._clear_iptables()  # Clear iptables rules when stopping
        self.pcap_writer.close()  # Close the PcapWriter
        print(f"✅ Packet logging stopped. Packets saved to {self.pcap_file}.")

    def _run_logger(self):
        """Runs the packet logging loop in a separate thread."""
        self.nfqueue.bind(self.queue_num, self._log_packet)
        try:
            while self.running:
                self.nfqueue.run(False)
                time.sleep(0.1)  # small delay to avoid busy waiting
        except Exception as e:
            print(f"⚠️ Error during packet logging: {e}")
        finally:
            self.nfqueue.unbind()

    def _run_iptables(self):
        """
        Set up iptables rules to intercept packets and send them to NetfilterQueue.
        """
        print("⚙️ Setting up iptables rules...")
        command = f"sudo iptables -A FORWARD -j NFQUEUE --queue-num {self.queue_num}"
        try:
            subprocess.run(command, shell=True, check=True)
            print("✅ iptables NFQUEUE rules set for logging packets.")
        except subprocess.CalledProcessError as e:
            print(f"⚠️ Failed to set up iptables rules: {e}")

    def _clear_iptables(self):
        """
        Clear the iptables rules created for NetfilterQueue.
        """
        print("🧹 Clearing iptables rules...")
        command = f"sudo iptables -D FORWARD -j NFQUEUE --queue-num {self.queue_num}"
        try:
            subprocess.run(command, shell=True, check=True)
            print("✅ iptables NFQUEUE rules cleared.")
        except subprocess.CalledProcessError as e:
            print(f"⚠️ Failed to clear iptables rules: {e}")

    def _initialize_pcap_file(self):
        """Ensures that the pcap file and its directory exist."""
        pcap_dir = os.path.dirname(self.pcap_file)
        
        # Create the directory if it does not exist
        if pcap_dir and not os.path.exists(pcap_dir):
            os.makedirs(pcap_dir)

        # Create an empty pcap file if it does not exist
        if not os.path.exists(self.pcap_file):
            open(self.pcap_file, 'wb').close()

    def _log_packet(self, packet):
        """
        This function is called by NetfilterQueue for each packet that
        passes through the queue. It saves the packet to the pcap file.

        Args:
            packet (scapy.Packet): The packet currently being processed.
        """
        try:
            payload = packet.get_payload()
            spkt = IP(payload)
            self.pcap_writer.write(spkt)  # Write the packet to the pcap file
            packet.accept()               # Forward the packet
        except Exception as e:
            print(f"⚠️ Failed to log packet: {e}")
            packet.drop()