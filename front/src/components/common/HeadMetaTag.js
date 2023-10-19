
import { Helmet } from 'react-helmet-async';

const HeadMetaTag = props => {

    const meta = {
      title: "HOBBYIST. 습관 만들기", 
      description: "습관관리를 통해 새로운 습관을 만들어보세요", 
      keywords: "습관 숙제", 
      imgsrc: "https://web-hobbyist-front-euegqv2bln64g6o5.sel5.cloudtype.app/favicon.ico", 
      url: "https://web-hobbyist-front-euegqv2bln64g6o5.sel5.cloudtype.app",
    }
    return (
      <Helmet>
        <title>{props.title}</title>

        <meta name="description" content={props.description || meta.description} />
        <meta name="keywords" content={props.keywords || meta.keywords} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title || meta.title} />
        <meta property="og:site_name" content={props.title || meta.title} />
        <meta property="og:description" content={props.description || meta.description} />
        <meta property="og:image" content={props.imgsrc || meta.imgsrc} />
        <meta property="og:url" content={props.url || meta.url} />

        <meta name="twitter:title" content={props.title || meta.title} />
        <meta name="twitter:description" content={props.description || meta.description} />
        <meta name="twitter:image" content={props.imgsrc || meta.imgsrc} />

        <link rel="canonical" href={props.url || meta.url} />
      </Helmet>
    );
};

export default HeadMetaTag;