# YokuPay x ChainLink

## Main goals

Our goal is to use ChainLink as an information provider, which sends data to our Smartcontract. We have set
up our own ChainLink Oracle for this purpose. In the ChainLink CLI we create our own jobs which are adapted
to our requirements. The data is provided and processed by our external adapter.

## Returned Data

The returned data is converted into bytes in the external adapter. The data contains data about the current
user address. In addition, a number is returned that indicates the status of the process and is then processed
by the smartcontract. The current ADA-ETH price is also returned. These three data are converted into bytes.

```const result = Web3.utils.asciiToHex(user + "1" + adaeth);
    const response = { data: { result: result }, status: 200 };
    callback(jobRunID, Requester.success(jobRunID, response));
```

The whole process can be looked up in `./src/function/BuyNFT.js`

## ChainLink Job

Five different external adapters are queried in the ChainLink job. The returned data is unpacked for further
processing.

```
    fetch_1        [type=bridge name="UintTest1" requestData="{\\"id\\": $(jobSpec.externalJobID), \\"data\\": { \\"txh\\": $(decode_cbor.txh)}}"]
    parse_1        [type=jsonparse path="result" data="$(fetch_1)"]
```

In order to provide a decentralised solution, the answers of the five servers should be compared. The response
that is returned most often should then be returned to the smart contract.

```
my_median_task [type="mode"
                values=<[ $(parse_1), $(parse_2), $(parse_3), $(parse_4), $(parse_5) ]>
                allowedFaults=2]
```

## Problem

This is where the problem arises. The Mode Task returns a JSON with results and occurrences. Results
contains an array with the most common response of the servers. The problem is that we are not able to
access this array to continue working with this data.

```
{
  "results": ["0x30783765314242444465336342323646343036383030383638663130313035353932643530376244303732" ],
  "occurrences": 3
}
```

We tried multiple solutions to solve this problem, but dont got it.
The most common way for us was to do it with the jsonparse task, but this gives us the error:

```
data: expected string, got map[string]interface {}: bad input for task
```

So we need a solution to acces the response from the mode task to retun it to the smart contract.
The whole job is in `./chainlink/job.txt`

## Error output

See the error output in ```./chainlink/error.json``` 

## Run the server

- run `npm install`
- add .env:
  ```POSTGRES_USER=postgres
  POSTGRES_PASSWORD=password
  POSTGRES_HOST=23.88.50.29
  POSTGRES_PORT=5432
  POSTGRES_DATABASE=jobs
  NFT_CONTRACT=0x85a3836E8A6B3DABc531Ed97F4CBa1bF5ddF4782
  ```
- run `npm or nodemon start externalAdapter.js`

## Deploy contract and create Job

- create Job in the ChainLink CLI with `./chainlink/job.txt`
- deploy contract `./chainlink/contract.sol`

- Job bridges:
  ```
   UintTest1: https://jpg-adapter.yokupass.com/buyNFT
   UintTest2: https://jpg-adapter.yokupass.com/buyNFT_1
   UintTest3: https://jpg-adapter.yokupass.com/buyNFT_2
   UintTest4: https://jpg-adapter.yokupass.com/buyNFT_3
   UintTest5: https://jpg-adapter.yokupass.com/buyNFT_4
  ```

  for localhost testing:
  ```
   UintTest1:  http://localhost:6500/buyNFT
   UintTest2:  http://localhost:6500/buyNFT_1
   UintTest3:  http://localhost:6500/buyNFT_2
   UintTest4:  http://localhost:6500/buyNFT_3
   UintTest5:  http://localhost:6500/buyNFT_4
  ```
