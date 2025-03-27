import User from "../models/user.js";

export default async function getAuthorController(req, res) {
  try {
    const Authors = await User.find({
      $expr: { $gt: [{ $size: "$blogsCreated" }, 0] },
    }).sort({ blogsCreated: 1 });

    if (!Authors) return res.status(200).json({ message: "No authors found" });

    return res.status(200).json({ authors: Authors });
  } catch (e) {
    console.log("error in getAuthorController controller: ", e);
  }
}
