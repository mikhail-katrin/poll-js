# poll-js [![Build Status](https://travis-ci.org/mikhail-katrin/poll-js.svg?branch=master)](https://travis-ci.org/mikhail-katrin/poll-js) [![npm version](https://badge.fury.io/js/poll-js.svg)](https://badge.fury.io/js/poll-js)


## Installation

Using npm: ```npm install poll-js```

Using yarn: ```yarn add poll-js```

## Usage

```$xslt  
import { pollWrapper } from 'poll-js';

const { future, cancel, retries } = pollWrapper({
  request: fetch('github.com'),
  pollingPeriod: 1000,
  shouldStop: response => response.status === 200
});

future
  .then(response => {...})
  .catch(error => {...})

// If by some reason you want to abort polling
cancel();  
```

## API

#### .pollWrapper({request, pollingPeriod, shouldStop, attempts})

Returns `Promise`, `cancel` function and `retries` number. `cancel` allows manually terminate polling.

##### `request` - Function that returns `Promise` .
##### `pollingPeriod` - Time in ms after `request` rejection and new attempt to execute `request`.
##### `shouldStop` - Function which determines a condition for polling termination.
##### `attempts` - [Optional] Integer positive number which bounds total number of retries. `null` by default.



## License

MIT © 2018 Mikhail Katrin mikhailkatrin@gmail.com