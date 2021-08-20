// main.js

// Modules to control application life and create native browser window
const { default: axios } = require("axios");
const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    // maximizable: false,
    backgroundColor: "#263238",
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // mainWindow.removeMenu();
  // and load the index.html of the app.
  mainWindow.loadURL("http://localhost:3000");
  loginToServer();

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

const loginToServer = () => {
  return axios
    .post(
      "http://localhost:8000/api/v1/auth/login/",
      {
        email: "test16@test.com",
        password: "Qwertyu1@",
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      // handle success
      // console.log(res);
      return res;
    })
    .catch((err) => {
      // handle error
      console.log(err);
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
