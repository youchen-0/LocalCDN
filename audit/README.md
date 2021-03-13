### Introduction
This script makes it possible for any user and extension reviewer to verify the integrity of the resources bundled. It compares all libraries with their original sources. Optionally, a local Tor proxy can be used. In total, there are over 1000 files in LocalCDN. This process can take between 5 and 15 minutes.

### Prerequisites
* GNU/Linux (Debian, Ubuntu,...)
* Bash >= 4.4
* LocalCDN >= v2.6.3
* Local Tor SOCKS5 Proxy (optional, but recommended)


### Settings
* The script has 2 different settings. You have to edit them manually inside the script.
* Use local Tor Proxy
  * `USE_TOR=true` slow (~ 15 minutes)
  * `USE_TOR=false` fast (~ 4 minutes)
* Generate the THIRD_PARTY.txt file. This file contains all source URLs that were used for the check.
  * `CREATE_THIRD_PARTY_FILE=true`
  * `CREATE_THIRD_PARTY_FILE=false`


### Tor Proxy
* Install Tor Proxy
  * `sudo apt install tor`
  * e.g. https://linuxconfig.org/install-tor-proxy-on-ubuntu-20-04-linux
* Check Tor
  * `systemctl status tor@default.service`
  * `systemctl status tor.service`


### How to start
Open up a terminal and `cd` into this directory. However you run the script, the output can be redirected to a file with ` > output.txt`
* Check all files:
  * `bash audit.sh`
  * `bash audit.sh > output.txt`
* Check only one library. Choose the folder name from `/resources/`, e.g. `jquery`:
  * `bash audit.sh jquery`
  * `bash audit.sh jquery > output.txt`
* Check all files and replace in case of hash mismatch:
  * `bash audit.sh replace`
  * `bash audit.sh replace > output.txt`
* Check only one library files and replace in case of hash mismatch. Choose the folder name from `/resources/`, e.g. `jquery`:
  * `bash audit.sh replace jquery`
  * `bash audit.sh replace jquery > output.txt`
