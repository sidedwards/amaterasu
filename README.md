# Amaterasu 🔥

Amaterasu is a secure file and directory deletion utility that erases files and directories from existence, ensuring that sensitive data is permanently destroyed.

![itachi-uchiha](https://user-images.githubusercontent.com/11489608/229286023-491486c1-2ec4-435c-9ee7-c3eed77313b5.jpg)

## Features

- Securely delete files by overwriting them with random data
- Support for secure deletion of **files of any size**
- Configurable number of overwrite passes for increased security
- Cross-platform support (Windows, macOS, Linux)
- Easy to use command-line interface

## Requirements

- [Deno](https://deno.land/) runtime environment (version 1.0.0 or later)

## Installation

1. Make sure you have Deno installed on your system. If you don't have it yet, follow the installation instructions at [https://deno.land](https://deno.land/).

2. Clone the repository:

    ```
    git clone https://github.com/sidedwards/amaterasu.git
    ```
3. Compile into an executable binary:

    ```
    deno compile --unstable --allow-read --allow-write amaterasu.ts
    ```

    You will see an executable binary named `amaterasu` (or `amaterasu.exe` on Windows) in the current directory.
    
    > **Note**
    > The `--unstable` flag is required as deno compile is an unstable feature at the time of writing. The `--allow-read` and `--allow-write` flags are needed for file access during runtime.

## Usage

### General usage:

`./amaterasu [file|directory] [options]`

On Windows:

`.\amaterasu.exe [file|directory] [options]`


### Options:

- `--passes, -p [number]`: Number of overwrite passes (default: 3)
- `--help`: Show help message

## Example

Securely delete a file called `secret.txt` with 5 overwrite passes:

`./amaterasu secret.txt --passes 5`

On Windows:

`.\amaterasu.exe secret.txt --passes 5`


## Contributing

If you'd like to contribute to the project, feel free to open a pull request or create an issue to report bugs or suggest improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](./license.md) file for details.
