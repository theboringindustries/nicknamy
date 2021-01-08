## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/theboringindustries/nicknamy
   ```
2. Create line separated file with nicknames you want to check
   ```sh
   first nickname
   second nickname
   ...
   ```

## Usage

```sh
node src/index.js {filename} {next-request-timeout}
```

| Argument               | Type         |  Example      |
|------------------------|--------------|---------------|
| {filename}             | string       | nicknames.txt |
| {next-request-timeout} | number in ms | 100           |


## Custom api
For custom api, you should change `API` constant inside `src/index.js`

```sh
const API = 'https://domain.com'
```