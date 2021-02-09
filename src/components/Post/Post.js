import './Post.css';
// another way to pass the parent routing properties to the child Post component is by using withRouter
import { withRouter } from 'react-router-dom';

const post = (props) => {
    console.log('[Post.js] props:');
    console.log(props);
    return (
        <article className="Post" onClick={props.clicked}>
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="Author">{props.author}</div>
            </div>
        </article>
    );
};
export default withRouter(post);