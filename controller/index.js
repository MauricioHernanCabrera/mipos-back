const formatDate = (date) => date.slice(0, 10).replace(/-/g, "/");
const formatHour = (date) => date.slice(11, 16);

const newOpen = (balance) => {
  const newDate = new Date().toJSON();
  const date_open = formatDate(newDate);
  const hour_open = formatHour(newDate);

  const value_previous_close =
    typeof balance.value_close == "number"
      ? balance.value_close
      : balance.value_previous_close || 0;

  const data = {
    date_open,
    hour_open,
    value_open: null,
    value_previous_close,
    observation: "",
  };
  console.log({ data });
  return data;
};

const getOpen = ({
  date_open,
  hour_open,
  value_open,
  value_previous_close,
  observation,
}) => {
  return {
    date_open,
    hour_open,
    value_open,
    value_previous_close,
    observation,
  };
};

module.exports.balance = async (req, res, next) => {
  try {
    const [lastBalance = {}] = context.balance;
    let data = {};

    const hasValueOpen =
      lastBalance.value_open && typeof lastBalance.value_open == "number";
    const hasValueClose =
      lastBalance.value_close && typeof lastBalance.value_open == "number";

    if (hasValueOpen && hasValueClose) {
      console.log("hasValueOpen && hasValueClose");
      data = newOpen(lastBalance);
    } else if (hasValueOpen && !hasValueClose) {
      console.log("hasValueOpen && !hasValueClose");
      data = getOpen(lastBalance);
    } else if (!hasValueOpen && hasValueClose) {
      console.log("!hasValueOpen && hasValueClose");
      data = newOpen(lastBalance);
    } else {
      console.log("!hasValueOpen && !hasValueClose");
      data = newOpen(lastBalance);
    }

    const responseSuccess = {
      status: "Success",
      results: data,
    };

    console.log("------------------------------");
    console.log(context.balance);
    res.status(200).json(responseSuccess);
  } catch (err) {
    next(err);
  }
};

module.exports.balanceOpenDay = async (req, res, next) => {
  try {
    const [lastBalance = {}] = context.balance;

    if (lastBalance.date_open && !lastBalance.date_close) {
      return res.status(400).json({
        msg: "Necesitas cerrar tu ultima caja para poder abrir una nueva",
        status: "Fail",
      });
    }

    const defaultValues = {
      date_open: "",
      hour_open: "",
      value_previous_close: 0,
      value_open: 0,
      observation: "",
    };

    const openData = Object.assign(defaultValues, req.body);

    const responseSuccess = {
      msg: "Información guardada con éxito",
      results: openData,
    };

    context.balance.unshift(openData);

    console.log("------------------------------");
    console.log(context.balance);
    res.status(201).json(responseSuccess);
  } catch (err) {
    next(err);
  }
};

module.exports.hasOpenCashierBalance = async (req, res, next) => {
  try {
    const [lastBalance = null] = context.balance;

    if (!lastBalance) {
      return res.status(400).json({
        msg: "Necesitas abrir una caja para poder cerrarla",
        status: "Fail",
      });
    }

    const { value_open } = lastBalance;

    const responseSuccess = {
      msg: "Success",
      results: true,
      value: String(value_open || 0),
      close: "0",
      card: "0",
    };

    console.log("------------------------------");
    console.log(context.balance);
    res.status(200).json(responseSuccess);
  } catch (err) {
    next(err);
  }
};

module.exports.cashierBalanceCloseDay = async (req, res, next) => {
  try {
    const [lastBalance = null] = context.balance;

    if (!lastBalance) {
      return res.status(400).json({
        msg: "Necesitas abrir una caja para poder cerrarla",
        status: "Fail",
      });
    }

    if (lastBalance.date_close) {
      return res.status(400).json({
        msg: "Necesitas abrir una caja para poder cerrarla",
        status: "Fail",
      });
    }

    const data = Object.assign({}, req.body);

    console.log("cashierBalanceCloseDay", req.body);

    const indexItem = 0;
    const lengthItemToReplace = 1;
    const balanceItem = {
      ...lastBalance,
      ...data,
    };
    context.balance.splice(indexItem, lengthItemToReplace, balanceItem);

    console.log("------------------------------");
    console.log(context.balance);
    res.status(200).json({
      msg: "Información guardada con éxito",
      results: null,
    });
  } catch (err) {
    next(err);
  }
};
