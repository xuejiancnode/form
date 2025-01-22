import { exec, spawn } from "child_process"

const gitLog = spawn('git', ['push']);

gitLog.stdout.on('data', (data) => {
  console.log(`日志输出: ${data}`);
});

gitLog.stderr.on('data', (data) => {
  console.error(`错误信息: ${data}`);
});

gitLog.on('close', (code) => {
  console.log(`子进程退出，退出码: ${code}`);
});

exec('git add ./package/package.json', (error, stdout, stderr) => {
  console.log(error);
  console.log(stdout);
  console.log(stderr);
  if (error) {
    console.error(`[git add] error: ${error}`);
    return;
  }

  exec('git commit -m "update version"', (error, stdout, stderr) => {
    console.log(error);
    console.log(stdout);
    console.log(stderr);
    if (error) {
      console.error(`[git commit] error: ${error}`);
      return;
    }

    exec('git push origin develop', (error, stdout, stderr) => {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
      if (error) {
        console.error(`[git push] error: ${error}`);
        return;
      }

      console.log('done');
      // 实时输出git日志

    })
  })
})