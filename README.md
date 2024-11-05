# 🕷️ BlackVenom: The Ultimate Ethical ARP and DNS Spoofing Tool 🕸️

**BlackVenom** is a powerful ARP and DNS spoofing tool designed for ethical hackers and cybersecurity professionals. 🛡️ This utility allows you to seamlessly intercept and log network traffic, providing valuable insights into network vulnerabilities while remaining undetected. 🕵️‍♂️⚡

Built with stealth and precision in mind, **BlackVenom** operates like a digital venomous strike: fast, effective, and silent. 🖤 Whether you're conducting penetration tests, monitoring network vulnerabilities, or analyzing traffic for security research, **BlackVenom** empowers you to take full control of ARP tables and spoof DNS requests for educational and professional purposes. 🖥️💉

### Disclaimer ⚠️
BlackVenom is intended for ethical use only. Misuse of this tool against unauthorized systems is illegal and may result in severe penalties. Always obtain permission before testing network security. 📜

Join the BlackVenom web of digital defenders and harness the power of stealthy network manipulation for the greater good! 🕸️✨

### Key Features:
- **🌐 ARP Spoofing Mastery**: Perform bidirectional ARP spoofing to impersonate devices and intercept traffic between them. 🔄
- **🔍 DNS Spoofing Capabilities**: Redirect DNS requests to specified IP addresses, enabling control over domain resolutions. 📡
- **📄 Traffic Logging**: Capture and log all intercepted network traffic in a configurable PCAP file for later analysis. 📂
- **⚙️ Ethical & Stealthy**: Designed for ethical hacking, ensuring you stay invisible while uncovering security flaws. 🕶️

### Use Cases:
- **Network Penetration Testing**: Assess the security of networks by identifying weaknesses in ARP protocols and DNS resolutions. 🔍🛡️
- **Security Auditing**: Log and analyze network traffic to discover potential vulnerabilities and improve network defenses. 📊🔒
- **Educational Purposes**: Learn and teach network security concepts through practical, hands-on experience with ARP and DNS spoofing techniques. 🎓📚
- **Traffic Analysis**: Monitor and capture traffic for forensic investigations or to understand user behavior on a network. 🔍📈


### Dependencies 📦

**BlackVenom** requires several Python packages to function effectively. Below are the key dependencies along with their respective versions:

- **scapy==2.6.0** 🐍: A powerful Python library for network packet manipulation, allowing the creation, sending, and sniffing of network packets.
- **tqdm==4.65.0** ⏳: A fast, extensible progress bar for Python, used to provide visual feedback during long-running tasks.
- **rich==13.9.2** 🌈: A library for rich text and beautiful formatting in the terminal, enhancing the output of the tool with colors and styles.
- **netifaces==0.11.0** 🌐: A cross-platform library to get network interface information, useful for identifying available interfaces for ARP spoofing.
- **NetfilterQueue==1.1.0** 🔄: A Python binding to the netfilter queue library, allowing the manipulation of packets in user space for packet filtering and modification.

Ensure that these dependencies are installed in your Python environment to use **BlackVenom** effectively. ✅

### Usage Examples

#### Example 1: Basic ARP Spoofing
This command performs a basic ARP spoofing attack between a target and a gateway without enabling packet logging or DNS spoofing. 🔗

```bash
sudo python black_venom_cli.py \
    --target_ip 192.168.11.128 \
    --gateway_ip 192.168.11.2 \
    --interface eth0
```

#### Example 2: ARP Spoofing with Traffic Logging
In this example, packet logging is enabled while performing ARP spoofing. 📝

```bash
sudo python black_venom_cli.py \
    --target_ip 192.168.11.128 \
    --gateway_ip 192.168.11.2 \
    --interface eth0 \
    --enable_logging \
    --log_file ~/Desktop/captured_packets.pcap

```


#### Example 3: ARP Spoofing and DNS Spoofing
This command enables both ARP spoofing and DNS spoofing, redirecting DNS requests for a specific domain. 🌐🔀

```bash
sudo python black_venom_cli.py \
    --target_ip 192.168.11.128 \
    --gateway_ip 192.168.11.2 \
    --interface eth0 \
    --enable_logging \
    --log_file ~/Desktop/captured_packets.pcap
```

#### Example 4: Multiple DNS Records
Here multiple DNS records are redirected to a specific IP. This command performs ARP and DNS spoofing while logging traffic. 📄🔄

```bash
sudo python black_venom_cli.py \
    --target_ip 192.168.11.128 \
    --gateway_ip 192.168.11.2 \
    --interface eth0 \
    --enable_logging \
    --log_file ~/Desktop/captured_packets.pcap \
    --spoof_dns \
    --dns_records "example.com=192.168.11.10" "anotherdomain.com=192.168.11.11"
```

#### Example 5: No Logging but with DNS Spoofing
This example performs ARP spoofing and DNS spoofing without enabling traffic logging. 🚫📝

```bash
sudo python black_venom_cli.py \
    --target_ip 192.168.11.128 \
    --gateway_ip 192.168.11.2 \
    --interface eth0 \
    --spoof_dns \
    --dns_records "example.com=192.168.11.10"
```

### Summary of Options
- **`--target_ip`**: IP address of the target device. 💻
- **`--gateway_ip`**: IP address of the network gateway. 🌉
- **`--interface`**: Network interface to use (default is `eth0`). 🌐
- **`--enable_logging`**: Enable traffic logging to a PCAP file. 📝
- **`--log_file`**: Path and name of the PCAP file for logging. 📂
- **`--spoof_dns`**: Enable DNS spoofing. 🌐
- **`--attacker_ip`**: IP to which DNS requests should be redirected. 🚀
- **`--dns_queue_num`**: Queue number for DNS spoofing (default is `2`). 📊
- **`--dns_records`**: DNS records in the format `'domain=ip'` to redirect requests. 📜

