// amaterasu.ts

async function fileExists(filepath: string): Promise<boolean> {
  try {
    const fileInfo = await Deno.stat(filepath);
    return fileInfo.isFile;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }
    throw err;
  }
}

async function secureDelete(filepath: string, passes: number): Promise<void> {
  try {
    const fileInfo = await Deno.stat(filepath);

    if (fileInfo.isFile) {
      const fileSize = fileInfo.size;
      const chunkSize = 65536;

      for (let pass = 1; pass <= passes; pass++) {
        console.log(`Incinerating 🔥🔥'${filepath}'🔥🔥 (pass ${pass}/${passes})...`);

        let offset = 0;

        while (offset < fileSize) {
          const remainingSize = fileSize - offset;
          const currentChunkSize = Math.min(chunkSize, remainingSize);
          const randomData = new Uint8Array(currentChunkSize);
          crypto.getRandomValues(randomData);

          const file = await Deno.open(filepath, { write: true, create: false, truncate: false });
          await Deno.seek(file.rid, offset, Deno.SeekMode.Start);
          await Deno.write(file.rid, randomData);
          await Deno.close(file.rid);

          offset += currentChunkSize;
        }
      }

      await Deno.remove(filepath);
      console.log(`Vanished '${filepath}' from existence.`);
    } else if (fileInfo.isDirectory) {
      const entries = Deno.readDir(filepath);

      for await (const entry of entries) {
        const entryPath = `${filepath}/${entry.name}`;
        await secureDelete(entryPath, passes);
      }

      await Deno.remove(filepath);
      console.log(`Vanished directory '${filepath}' from existence.`);
    } else {
      console.error(`Error: '${filepath}' is neither a file nor a directory.`);
    }
  } catch (err) {
    console.error(`Error: Failed to secure delete '${filepath}':`, err);
  }
}

function parseArgs(args: string[]): { filepath: string; passes: number; help: boolean } {
  let filepath = "";
  let passes = 3;
  let help = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case "--passes":
      case "-p":
        i++;
        passes = parseInt(args[i], 10);
        break;
      case "--help":
        help = true;
        break;
      default:
        filepath = arg;
        break;
    }
  }

  return { filepath, passes, help };
}

const { args } = Deno;
const { filepath, passes, help } = parseArgs(args);

if (!filepath || help) {
  console.log(`
Usage:
  amaterasu [file|directory] [options]

Options:
  --passes, -p [number]  Number of overwrite passes (default: 3)
  --help                 Show this help message

Description:
  Amaterasu securely deletes a specified file or directory by overwriting
  it with random data multiple times before removing it.
  `);
} else {
  await secureDelete(filepath, passes);
}
