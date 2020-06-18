module.exports.balance = async (req, res, next) => {
  try {
    const data = {
      date_open: "2019/06/11",
      hour_open: "12:45",
      value_previous_close: 6280,
      value_open: null,
      observation: "",
    };

    const responseSuccess = {
      status: "Success",
      results: data,
    };

    res.status(200).json(responseSuccess);
  } catch (err) {
    next(err);
  }
};

module.exports.balanceOpenDay = async (req, res, next) => {
  try {
    const defaultValues = {
      date_open: "",
      hour_open: "",
      value_previous_close: 0,
      value_open: 0,
      observation: "",
    };

    const data = Object.assign(defaultValues, req.body);

    const responseSuccess = {
      msg: "Información guardada con éxito",
      results: data,
    };

    res.status(201).json(responseSuccess);
  } catch (err) {
    next(err);
  }
};

module.exports.hasOpenCashierBalance = async (req, res, next) => {
  try {
    const responseSuccess = {
      msg: "Success",
      results: true,
      value: "5000",
      close: "0",
      card: "0",
    };
    res.status(200).json(responseSuccess);
  } catch (err) {
    next(err);
  }
};

module.exports.cashierBalanceCloseDay = async (req, res, next) => {
  try {
    const defaultValues = {
      date_close: "",
      hour_close: "",
      value_card: 0,
      value_cash: 0,
      value_close: 0,
      value_open: 0,
      value_sales: 0,
      expenses: [],
    };

    const data = Object.assign(defaultValues, req.body);

    res.status(200).json({
      msg: "Información guardada con éxito",
      results: null,
    });
  } catch (err) {
    next(err);
  }
};
