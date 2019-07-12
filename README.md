# poll-js [![Build Status](https://travis-ci.org/mikhail-katrin/poll-js.svg?branch=master)](https://travis-ci.org/mikhail-katrin/poll-js) [![npm version](https://badge.fury.io/js/poll-js.svg)](https://badge.fury.io/js/poll-js)


## Installation

Using npm: ```npm install poll-js```

Using yarn: ```yarn add poll-js```

## Usage

```$xslt  
import { pollWrapper } from 'poll-js';

const { future, cancel } = pollWrapper({
  request: () => fetch('github.com'),
  pollingPeriod: 1000, // ms
  shouldStop: response => response.status === 200 
});

future
  .then(response => {...})
  .catch(error => {...})

// If by some reason you want to abort polling
cancel();  
```


## API

#### .pollWrapper({request, pollingPeriod, shouldStop})

Returns `Promise` and `cancel` function. `cancel` allows manually terminate polling.

##### `request` - Function that returns `Promise` 
##### `pollingPeriod` - Time in ms after `request` rejection and new attempt to perform it
##### `shouldStop` - Function which determines a condition for polling termination.



## License

MIT © 2019 Mikhail Katrin katrinmikhail@gmail.com
