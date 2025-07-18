const Img = ({ url, caption }) => {
    if (!url || url.startsWith("blob:")) {
      console.warn("Invalid or missing image URL:", url);
      return null;
    }
  
    return (
      <div>
        <img src={url} alt={caption || "blog image"} />
        {caption?.length > 0 && (
          <p className="w-full text-center my-3 md:mb-12 text-base text-dark-grey">
            {caption}
          </p>
        )}
      </div>
    );
  };
  
  const List = ({ style, items }) => {
    return (
      <ol className={`pl-5 ${style === "ordered" ? "list-decimal" : "list-disc"}`}>
        {items.map((listItem, i) => (
          <li key={i} className="my-4" dangerouslySetInnerHTML={{ __html: listItem }}></li>
        ))}
      </ol>
    );
  };
  
  const Quote = ({ quote, caption }) => {
    return (
      <div className="bg-purple/10 p-3 pl-5 border-l-4 border-purple">
        <p className="text-xl leading-10 md:text-2xl">{quote}</p>
        {caption?.length > 0 && (
          <p className="w-full text-purple text-base">{caption}</p>
        )}
      </div>
    );
  };
  
  const BlogContent = ({ block }) => {
    const { type, data } = block;
  
    if (type === "paragraph") {
      return <p dangerouslySetInnerHTML={{ __html: data.text }} />;
    }
  
    if (type === "header") {
      if (data.level === 3) {
        return (
          <h3
            className="text-3xl font-bold"
            dangerouslySetInnerHTML={{ __html: data.text }}
          />
        );
      }
      return (
        <h2
          className="text-4xl font-bold"
          dangerouslySetInnerHTML={{ __html: data.text }}
        />
      );
    }
  
    if (type === "image") {
      return <Img url={data.file.url} caption={data.caption} />;
    }
  
    if (type === "quote") {
      return <Quote quote={data.text} caption={data.caption} />;
    }
  
    if (type === "list") {
      return <List style={data.style} items={data.items} />;
    }
  
    return null;
  };
  
  export default BlogContent;
  