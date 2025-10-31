import Tweet from "./UserPost"

const tweets = [


    //Hay que hacer fetch al get users/id/post
  {
    name: "Franiel",
    username: "franiel_dev",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Asuna",
    content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    date: "31 oct 2025",
  },
  {
    name: "Franiel",
    username: "franiel_dev",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Asuna",
    content: "Quibusdam rerum,deleniti ex debitis culpa distinctio explicabo cumque vitae quis dignissimos maiores architecto aut excepturiullam commodi voluptatibus, illo doloribus voluptas!",
    date: "30 oct 2025",
  },
]

const TweetLists = () => {
  return (
    <div className="mt-3">
      {tweets.map((t, i) => (
        <Tweet key={i} {...t} />
      ))}
    </div>
  )
}

export default TweetLists
