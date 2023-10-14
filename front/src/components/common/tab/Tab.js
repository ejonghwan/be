import { useState, lazy, Suspense } from "react";
import TabHead from './TabHead';
import TabBody from './TabBody';


const Tab = ({ tabHead, tabBody, id, className }) => {
    const [Index, setIndex] = useState(0);

    return (
        <article className={className} id={id}>
            <div className="tab_wrap">
                <TabHead heads={tabHead} setIndex={setIndex} Index={Index} />
                <TabBody Index={Index}>
                        {tabBody}
                </TabBody>
            </div>
        </article>
    )
}

export default Tab;