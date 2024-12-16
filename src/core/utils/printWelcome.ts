const printWelcome = (stage, address, port) => {
  console.log(`
          ---------------------------------------------------
          [ZUMI-BACKEND-${stage}] address: ${address} port:${port}
          ---------------------------------------------------`);
};

export { printWelcome };
