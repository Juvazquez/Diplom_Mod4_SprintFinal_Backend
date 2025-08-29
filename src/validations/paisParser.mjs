export function normalizarPais(req, res, next) {
    if (typeof req.body.capital === "string") {
      req.body.capital = req.body.capital
        .split(",")
        .map(c => c.trim())
        .filter(Boolean);//ver q pasa si no esta
    }
  
    if (typeof req.body.fronteras === "string") {
      req.body.fronteras = req.body.fronteras
        .split(",")
        .map(b => b.trim())
        .filter(Boolean);
    }
  
    next();
  }
  