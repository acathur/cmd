interface CommandOptions {
  noHelp?: boolean; // old name for hidden
  hidden?: boolean;
  isDefault?: boolean;
}

interface ExecutableCommandOptions extends CommandOptions {
  executableFile?: string;
}

interface ParseOptions {
  from?: "node" | "electron" | "user" | "deno";
}

interface ParseOptionsResult {
  operands: string[];
  unknown: string[];
}
