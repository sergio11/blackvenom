from BlackVenom.arp_spoofer import ArpSpoofer
from BlackVenom.packet_interceptor import PacketInterceptor

class BlackVenom:
    
    def __init__(self, interface='eth0', queue_num=1):
        """
        Initializes the BlackVenom class.

        Args:
            interface (str): The network interface to use (default is 'eth0').
            queue_num (int): The queue number for NetfilterQueue (default is 1).
        """
        self.arp_spoofer = ArpSpoofer(interface)
        self.packet_interceptor = PacketInterceptor(queue_num)
        self.target_ip = None
        self.gateway_ip = None
        self._print_banner()

    def start_spoofing(self, target_ip, gateway_ip):
        """
        Starts the ARP spoofing process by setting the target and gateway IPs.

        Args:
            target_ip (str): The IP address of the target machine.
            gateway_ip (str): The IP address of the gateway.
        """
        self.target_ip = target_ip
        self.gateway_ip = gateway_ip
        self.arp_spoofer.spoofing(target_ip, gateway_ip)
        self.packet_interceptor.start()

    def stop_spoofing(self):
        """
        Stops the ARP spoofing process and restores network settings.
        """
        self.arp_spoofer.stop(self.target_ip, self.gateway_ip)
        self.packet_interceptor.stop()
    
    
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
        BlackVenom 🖤: Ethical Hacking ARP Spoofing Tool (Version: )
        """
        print(banner)





                                               