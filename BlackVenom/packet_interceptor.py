from netfilterqueue import NetfilterQueue
import subprocess
import threading
from scapy.all import IP
import time

class PacketInterceptor:
    """
    A class to configure NetfilterQueue for packet interception.

    Attributes:
        queue_num (int): The queue number for NetfilterQueue.
        nfqueue (NetfilterQueue): Instance of the NetfilterQueue for packet interception.
        running (bool): A flag to indicate if the interceptor is running.
        thread (threading.Thread): The thread handling the packet interception.
    """

    def __init__(self, queue_num=1):
        """
        Initializes the PacketInterceptor.

        Args:
            queue_num (int): The queue number for NetfilterQueue (default is 1).
        """
        self.queue_num = queue_num
        self.nfqueue = NetfilterQueue()
        self.running = False
        self.thread = None

    def start(self):
        """Starts the packet interception process."""
        self._run_iptables()  # Set up iptables rules before starting interception
        self.running = True
        print(f"📡 Intercepting packets on queue {self.queue_num}...")
        self.thread = threading.Thread(target=self._run_interceptor)
        self.thread.start()

    def stop(self):
        """Stops the packet interception process."""
        print("🛑 Stopping packet interception...")
        self.running = False
        if self.thread:
            self.thread.join()  # Wait for the interceptor thread to finish
        self._clear_iptables()  # Clear iptables rules when stopping
        print("✅ Packet interception stopped.")

    def _run_interceptor(self):
        """Run the packet interception loop in a separate thread."""
        self.nfqueue.bind(self.queue_num, self.intercept)
        try:
            while self.running:
                self.nfqueue.run()
                time.sleep(0.1)  # Add a small delay to avoid busy waiting
        except KeyboardInterrupt:
            self.stop()  # Gracefully stop on interrupt

    def _run_iptables(self):
        """
        Set up iptables rules to intercept packets and send them to NetfilterQueue.
        """
        print("⚙️ Setting up iptables rules...")
        command = f"sudo iptables -A FORWARD -j NFQUEUE --queue-num {self.queue_num}"
        try:
            subprocess.run(command, shell=True, check=True)
            print("✅ iptables NFQUEUE rules set for intercepting packets.")
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

    def intercept(self, packet):
        """
        This function is called by NetfilterQueue for each packet that
        passes through the queue. It currently only accepts the packet.

        Args:
            packet (scapy.Packet): The packet currently being processed.
        """
        payload = packet.get_payload()
        spkt = IP(payload)
        print("📦 [+] Packet received:")
        packet.set_payload(bytes(spkt))  # Set the modified packet payload
        packet.accept()  # Forward the packet