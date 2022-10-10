let getHomePage = (req, res) => {
  return res.send(`success homepage!!!`);
};
let getAdminPage = (req, res) => {
  return res.status(200).json("You're welcome ADMIN !!!");
};
let getUserPage = (req, res) => {
  return res.status(200).json("You're welcome USER !!!");
};
export { getHomePage, getAdminPage, getUserPage };
