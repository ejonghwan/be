import { useState } from "react";
import TabHead from './TabHead';
import TabBody from './TabBody';
import './Tab.css';

const Tab = ({ tabHead, tabBody, id, className, onClick }) => {
    const [Index, setIndex] = useState(0);

    return (
        <article className={className} id={id}>
            <div className="tab_wrap">
                <TabHead heads={tabHead} setIndex={setIndex} Index={Index} onClick={onClick} />
                <TabBody Index={Index}>
                        {tabBody}
                </TabBody>
            </div>
        </article>
    )
}

export default Tab;