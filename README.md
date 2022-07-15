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

The whole process can be looked up in externalAdapter.js

## ChainLink Job

Five different external adapters are queried in the ChainLink job. The returned data is unpacked for further
processing.

```
    fetch_1        [type=bridge name="bridgeTwo" requestData="{\\"id\\": $(jobSpec.externalJobID), \\"data\\": { \\"txh\\": $(decode_cbor.txh)}}"]
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
The whole job is in job.txt 
