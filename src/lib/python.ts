import { spawn } from 'child_process';
import path from 'path';

export async function invoke(script: string, payload: unknown): Promise<any> {
  const scriptPath = path.resolve(process.cwd(), 'ml-cash-trainer', script);

  return new Promise((resolve, reject) => {
    const py = spawn('python3', [scriptPath], {
      stdio: ['pipe', 'pipe', 'inherit'],
    });

    let output = '';
    py.stdout.on('data', (chunk) => {
      output += chunk.toString();
    });

    py.on('error', (err) => {
      reject(err);
    });

    py.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python process exited with code ${code}`));
      } else {
        try {
          resolve(JSON.parse(output));
        } catch (e) {
          reject(e);
        }
      }
    });

    py.stdin.write(JSON.stringify(payload));
    py.stdin.end();
  });
}
