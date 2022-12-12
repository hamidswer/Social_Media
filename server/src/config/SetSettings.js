import Connectdb from "./settings/Connectdb.js";
import EnableCrossOrigin from "./settings/EnableCrossOrigin.js";
import AuthenticatePassport from "./settings/AuthenticatePassport.js";
import UseStatic from "./settings/UseStatic.js";
import OtherSettings from "./settings/OtherSettings.js";
import ManageSession from "./settings/ManageSession.js";
import UseRoutes from "./settings/UseRoutes.js";
import HandleError from "./settings/HandleError.js";
import SecureApi from "./settings/SecureApi.js";

const SetSettings = (app, server) => {
  Connectdb();
  HandleError(server);
  UseStatic(app);
  OtherSettings(app);
  SecureApi(app);
  EnableCrossOrigin(app);
  AuthenticatePassport(app);
  ManageSession(app);
  UseRoutes(app);
};
export default SetSettings;
