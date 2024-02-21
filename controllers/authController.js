const { User: UserModel } = require("../models/Auth")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  
  create: async(req, res) => {
    const {
      first_name, email, password
    } = req.body

    // Validation
    if(!first_name) {
      res.status(422).json({msg: "O nome é obrigatório!"})
    }
    if(!email) {
      res.status(422).json({msg: "O email é obrigatório!"})
    }
    if(!password) {
      res.status(422).json({msg: "O password é obrigatório!"})
    }

    // Check if user exists
    const userExists = await UserModel.findOne({ email: email })

    if(userExists) {
      res.status(422).json({msg: "Por favor, use outro email!"})
    }

    // crete password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // create user
    const user = new UserModel({
      first_name,
      email,
      password: passwordHash
    })

    try {
      await user.save()

      res.status(201).json({ msg: "Usuário criado com sucesso!" })
    } catch (error) {
      console.error(error)
      res.status(500).json({ msg: "Erro ao logar, tente novamente mais tarde!" })
    }
  },

  createL: async(req, res) => {
    
    const { email, password } = req.body

    if(!email) {
      res.status(422).json({msg: "O email é obrigatório!"})
    }
    if(!password) {
      res.status(422).json({msg: "O password é obrigatório!"})
    }

    // check if exists
    const user = await UserModel.findOne({ email: email })

    if(!user) {
      res.status(404).json({msg: "Usuário não encontrado!"})
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    
    if(!checkPassword) {
      res.status(422).json({msg: "Usuário ou senha inválida!"})
    }

    try {
      const secret = process.env.SECRET

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret,
      )

      res.status(200).json({ msg: "Successfully authenticated", token })

    } catch (error) {
      console.error(error)
      res.status(500).json({ msg: "Erro ao logar, tente novamente mais tarde!" })
    }
  },

  getUser: async (req, res) => {
    try {
      // Aqui você chama o middleware checkToken antes de continuar com a lógica da rota
      const { id } = req.user

      // Check if user exists
      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({ msg: "User not found!" });
      }

      const userWithoutPassword = { ...user.toObject() };
      delete userWithoutPassword.password;

      res.status(200).json({ user: userWithoutPassword });
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Erro ao obter usuário, tente novamente mais tarde!" });
    }
  },
}

module.exports = authController