import UserModel from "../../models/userModel.js";
const SearchUserService = async (searchName) => {
  try {
    let users = [];
    if (searchName.includes(" ")) {
      let array = searchName.split(" ");
      let firstName = array[0];
      const usersByFName = await searchByFName(firstName);
      users.push(...usersByFName);
      if (array[1]) {
        let lastName = array[1];
        const usersByLName = await searchByLName(lastName);
        users.push(...usersByLName);
      }
      if (users.length === 0) {
        let array = searchName.split(" ");
        let lastName = array[0];
        const usersByLName = await searchByLName(lastName);
        users.push(...usersByLName);
        if (array[1]) {
          let firstName = array[1];
          const usersByFName = await searchByFName(firstName);
          users.push(...usersByFName);
        }
      }
    }
    const usersByFirstName = await findUsersByFirstname(searchName);
    users.push(...usersByFirstName);
    const usersByLastName = await findUsersByLastname(searchName);
    users.push(...usersByLastName);
    let userList = users;
    if (userList.length > 8) {
      userList = userList.slice(0, 8);
    }
    const uniq = uniqBy(userList, (it) => it.firstname);
    return { responseStatus: 200, data: uniq };
  } catch (error) {
    return { responseStatus: 200, data: {} };
  }
};

const searchByFName = async (searchName) => {
  const users = await UserModel.aggregate([
    {
      $search: {
        index: "default",
        text: {
          query: searchName,
          path: "firstname",
        },
      },
    },
    {
      $project: {
        _id: 1,
        firstname: 1,
        lastname: 1,
        profilePicture: 1,
      },
    },
  ]);
  return users;
};

const searchByLName = async (searchName) => {
  const users = await UserModel.aggregate([
    {
      $search: {
        index: "default",
        text: {
          query: searchName,
          path: "lastname",
        },
      },
    },
    {
      $project: {
        _id: 1,
        firstname: 1,
        lastname: 1,
        profilePicture: 1,
      },
    },
  ]);
  return users;
};

const findUsersByFirstname = async (searchName) => {
  const users = await UserModel.aggregate([
    {
      $search: {
        index: "autocomplete",
        autocomplete: {
          query: searchName,
          path: "firstname",
          fuzzy: {
            maxEdits: 1,
          },
          tokenOrder: "sequential",
        },
      },
    },
    {
      $project: {
        _id: 1,
        firstname: 1,
        lastname: 1,
        profilePicture: 1,
      },
    },
    { $sample: { size: 8 } },
  ]);
  return users;
};

const findUsersByLastname = async (searchName) => {
  const users = await UserModel.aggregate([
    {
      $search: {
        index: "autocomplete",
        autocomplete: {
          query: searchName,
          path: "lastname",
          fuzzy: {
            maxEdits: 1,
          },
          tokenOrder: "sequential",
        },
      },
    },
    {
      $project: {
        _id: 1,
        firstname: 1,
        lastname: 1,
        profilePicture: 1,
      },
    },
    { $sample: { size: 8 } },
  ]);
  return users;
};

function uniqBy(a, key) {
  let seen = new Set();
  return a.filter((item) => {
    let k = key(item);
    return seen.has(k) ? false : seen.add(k);
  });
}

export default SearchUserService;
