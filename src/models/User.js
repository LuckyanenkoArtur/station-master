export class User {
  constructor(id, username, password) {
    this.id = id;
    this.usename = username;
    this.password = password;
  }
}

// User Management Utility
export class UserManager {
  // Get users from localStorage
  static getUsers() {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  }

  // Create a new user
  static createUser(username, password) {
    const users = this.getUsers();

    // Check if username already exists
    if (users.some((u) => u.username === username)) {
      throw new Error("Username already exists");
    }

    // Determine the next ID (increment from the last user)
    const nextId =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    // Create new user object
    const newUser = {
      id: nextId,
      username,
      password,
    };

    // Add new user to the array
    users.push(newUser);

    // Save to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    return newUser;
  }

  // Delete a user by ID
  static deleteUser(userId) {
    let users = this.getUsers();

    // Filter out the user with the given ID
    users = users.filter((user) => user.id !== userId);

    // Save updated users to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    return true;
  }
}
