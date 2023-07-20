import UsersDAO from "../dao/usersDAO.js"

export default class UsersController {
  static async apiGetUsers(req, res, next) {
    const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.email) {
      filters.email = req.query.email
    } else if (req.query.password) {
      filters.password = req.query.password
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { usersList, totalNumUsers } = await UsersDAO.getUsers({
      filters,
      page,
      usersPerPage,
    })

    let response = {
      users: usersList,
      page: page,
      filters: filters,
      entries_per_page: usersPerPage,
      total_results: totalNumUsers,
    }
    res.json(response)
  }
  static async apiGetUserById(req, res, next) {
    try {
      let id = req.params.id || {}
      let user = await UsersDAO.getUserByID(id)
      if (!user) {
        res.status(404).json({ error: "User not found" })
        return
      }
      res.json(user)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
  static async apiDeleteUser(req, res, next) {
    try {
      const id = req.query.id
      const reviewResponse = await UsersDAO.deleteUser(
        id
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
  static async apiPostUser(req, res, next) {
    try {
      const password = req.body.password
      const email = req.body.email
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }

      const UserResponse = await UsersDAO.addUser(
        password,
        userInfo,
        email,
        )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}