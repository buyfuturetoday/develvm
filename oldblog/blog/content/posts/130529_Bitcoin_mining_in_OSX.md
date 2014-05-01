Bitcoin mining in OSX

[meta:author]: <> (Jonas Colmsjo)
[meta:title]: <> (Bitcoin mining in OSX)
[meta:date]: <> (2013-05-28)
[meta:nested:key]: <> (Metadata value)

##!!truncate


Links:

 * http://www.bitcoinx.com/bitcoin-mining-software/
 * http://blog.nwoolls.com/2013/04/22/bitcoin-mining-on-mac-os-x-bitminter/
 * http://blog.nwoolls.com/2013/04/24/bitcoin-mining-on-mac-os-x-cgminer-bfgminer/
 * https://en.bitcoin.it/wiki/Comparison_of_mining_pools


 # First attempt in mining


 ```
 brew install https://dl.dropboxusercontent.com/s/qq8t51otgry14p3/cgminer.rb
 cgminer -o http://mint.bitminter.com:8332 -u colmsjo -p ...
[2013-05-29 14:36:47] All devices disabled, cannot mine!    
 ```

```
#download jnlp from bitminter.com
javaws bitminter.jnlp 

```


# Second attempt


 * http://josh.thisistaken.com/2011/05/how-to-run-bitcoin-miner-on-mac-os-x.html
 * https://bitcointalk.org/index.php?topic=75786


```
cd ~/Dropbox/local
git clone https://github.com/phoenix2/phoenix
cd phoenix
python setup.py build
sudo python setup.py install
```
