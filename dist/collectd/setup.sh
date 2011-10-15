#!/bin/bash

# Install collectd daemon
apt-get install build-essential
tar jxf collectd-5.0.1.tar.bz2
cd collectd-5.0.1
./configure
make all install

# Configuration
cp collectd.conf /opt/collectd/etc/collectd.conf
mkdir -p /opt/collectd/var/lib/collectd/csv  # TOOO: Write output over network instead

# Built-in monitoring tool
#ln -s /opt/collectd/share/perl/5.10.1/Collectd Collectd
#apt-get install -y librrds-perl libconfig-general-perl libhtml-parser-perl  libregexp-common-perl libapache2-mod-perl2
#service apache2 restart
#cp -r collectd-5.0.1/contrib/collection3/ /var/www/
#chown -R www-data /var/www/collection3/bin/

rm -rf collect-5.0.1
