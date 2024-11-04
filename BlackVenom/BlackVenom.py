from BlackVenom.arp_spoofer import ArpSpoofer
from BlackVenom.packet_logger import PacketLogger
from BlackVenom import __version__

class BlackVenom:
    
    def __init__(self, interface='eth0', queue_num=1, enable_logging=False, log_file="captured_packets.pcap"):
        """
        Initializes the BlackVenom class.

        Args:
            interface (str): The network interface to use (default is 'eth0').
            queue_num (int): The queue number for NetfilterQueue (default is 1).
            enable_logging (bool): If True, enables packet logging to a pcap file.
            log_file (str): Path to the pcap file for storing intercepted packets (only if logging is enabled).
        """
        self.arp_spoofer = ArpSpoofer(interface)
        self.target_ip = None
        self.gateway_ip = None
        self._print_banner()

        # Initialize PacketLogger if logging is enabled
        self.packet_logger = PacketLogger(queue_num, log_file) if enable_logging else None

    def start_spoofing(self, target_ip, gateway_ip):
        """
        Starts the ARP spoofing process and optionally starts packet logging.

        Args:
            target_ip (str): The IP address of the target machine.
            gateway_ip (str): The IP address of the gateway.
        """
        self.target_ip = target_ip
        self.gateway_ip = gateway_ip
        print("🕵️‍♂️ Starting ARP spoofing...")
        self.arp_spoofer.spoofing(target_ip, gateway_ip)

        # Start packet logging if logger is enabled
        if self.packet_logger:
            print("📄 Logging enabled. Starting packet logger...")
            self.packet_logger.start()

    def stop_spoofing(self):
        """
        Stops the ARP spoofing process and optionally stops packet logging.
        """
        print("🛑 Stopping ARP spoofing...")
        self.arp_spoofer.stop(self.target_ip, self.gateway_ip)

        # Stop packet logging if logger was enabled
        if self.packet_logger:
            print("🛑 Stopping packet logger...")
            self.packet_logger.stop()
    
    
    def _print_banner(self):
        """
        Prints a welcome banner at the start of the program for BlackVenom.
        """
        banner = f"""
        ██████╗ ██╗      █████╗  ██████╗██╗  ██╗       
        ██╔══██╗██║     ██╔══██╗██╔════╝██║ ██╔╝       
        ██████╔╝██║     ███████║██║     █████╔╝        
        ██╔══██╗██║     ██╔══██║██║     ██╔═██╗        
        ██████╔╝███████╗██║  ██║╚██████╗██║  ██╗       
        ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝       
                                                    
        ██╗   ██╗███████╗███╗   ██╗ ██████╗ ███╗   ███╗
        ██║   ██║██╔════╝████╗  ██║██╔═══██╗████╗ ████║
        ██║   ██║█████╗  ██╔██╗ ██║██║   ██║██╔████╔██║
        ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║██║   ██║██║╚██╔╝██║
        ╚████╔╝ ███████╗██║ ╚████║╚██████╔╝██║ ╚═╝ ██║
        ╚═══╝  ╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝
        BlackVenom 🖤: Ethical Hacking ARP Spoofing Tool (Version: {__version__})
        """
        print(banner)





                                               