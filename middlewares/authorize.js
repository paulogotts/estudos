export const authorize = (roles = []) => {
  return (req, res, next) => {
      if (!roles.includes(req.usuario.role)) {
          return res.status(403).json({ 
              erro: 'Acesso negado: permissão insuficiente' 
          });
      }
      next();
  };
};