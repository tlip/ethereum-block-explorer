# infura-explorer

```
███████╗████████╗██╗  ██╗███████╗██████╗ ███████╗██╗   ██╗███╗   ███╗
██╔════╝╚══██╔══╝██║  ██║██╔════╝██╔══██╗██╔════╝██║   ██║████╗ ████║
█████╗     ██║   ███████║█████╗  ██████╔╝█████╗  ██║   ██║██╔████╔██║
██╔══╝     ██║   ██╔══██║██╔══╝  ██╔══██╗██╔══╝  ██║   ██║██║╚██╔╝██║
███████╗   ██║   ██║  ██║███████╗██║  ██║███████╗╚██████╔╝██║ ╚═╝ ██║
╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝
                                                                     
            ██████╗ ██╗      ██████╗  ██████╗██╗  ██╗                
            ██╔══██╗██║     ██╔═══██╗██╔════╝██║ ██╔╝                
            ██████╔╝██║     ██║   ██║██║     █████╔╝                 
            ██╔══██╗██║     ██║   ██║██║     ██╔═██╗                 
            ██████╔╝███████╗╚██████╔╝╚██████╗██║  ██╗                
            ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝                
                                                                     
███████╗██╗  ██╗██████╗ ██╗      ██████╗ ██████╗ ███████╗██████╗     
██╔════╝╚██╗██╔╝██╔══██╗██║     ██╔═══██╗██╔══██╗██╔════╝██╔══██╗    
█████╗   ╚███╔╝ ██████╔╝██║     ██║   ██║██████╔╝█████╗  ██████╔╝    
██╔══╝   ██╔██╗ ██╔═══╝ ██║     ██║   ██║██╔══██╗██╔══╝  ██╔══██╗    
███████╗██╔╝ ██╗██║     ███████╗╚██████╔╝██║  ██║███████╗██║  ██║    
╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝                                                            
```

...is obviously an Ethereum block explorer that updates in real-time by hooking into Infura's websocket API. It is rendered on the server side, is written in `Typescript`, and built with `React v16.18`.
It manages Web3 data in the App state by using React's `useReducer` hooks wrapped in `Context` higher-order components to bless any component with direct access to anything it needs.

## Demo
Want to check out a live action demo?
### [Here you go!](http://explorer.thom.li)


## Getting started
1) Make sure you have:
    * `node v10.13.0+`
    * `npm | yarn`
    * `a computer`
2) Clone this repository
3) `cd <CLONED_DIRECTORY>`
4) `yarn` if you're of the persuarion, else `npm i`

### Building and running
```bash
$ npm run build && npm run start:prod
```

### Running dev mode
```bash
$ npm start
```


## Notes
* Operates one block behind current block
  * Temporary fix because sometimes calling `web3.eth.getBlock(BLOCK_NUMER)` for the newest block would return `null`.
* Doesn't reconnect to websocket if it closes after inactivity (Infura disconnects after 1 hour unless pinged).

## TO-DO
* ~~Add `# MORE TXs` at the bottom of the block cards when over TX count is >100.~~
* ~~Add ability to expand card to view overflow transactions.~~
* ~~Add transaction USD price data from CoinMarketCap or CryptoCompare.~~
* Add more tests (only 1 right now, sorry).
