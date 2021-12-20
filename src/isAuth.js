const fetchUser = async () => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  console.log(token);
  const res = await fetch(`${process.env.BACKEND_URL}/userdashboard`, {
    method: "get",

    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
      credentials: true,
      //contetent type importanat
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  if (res.status === 200) {
    const userData = await res.json();
    console.log("TRUE ENTERED +++++++++++++++++++++++");
    return true;
  }
  return false;
};

export default fetchUser;
