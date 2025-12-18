//middleware interseptar elementos antes de que lleguen a los controladores
//validar token que se envian desde el cliente
//si el token es valido, permitir el acceso al recurso
//si el token es invalido, denegar el acceso al recurso
import jwt from "jsonwebtoken";

const validarToken = (req, res, next) => {
  const autenticacionHeader = req.headers.authorization;

  if (!autenticacionHeader) {
    return res.status(401).json({ error: "Token no encontrado" });
  }

  const token = autenticacionHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token no encontrado" });
  }

  try {
    const tokenValido = jwt.verify(token, process.env.SECRET_KEY);
    if (!tokenValido) {
      return res.status(401).json({ error: "Token invalido" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalido" });
  }
};

export default validarToken;
