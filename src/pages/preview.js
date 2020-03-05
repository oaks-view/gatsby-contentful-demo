import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import SectionPreview from "../components/preview/section"
import ActionPreview from "../components/preview/action"
import CardPreview from "../components/preview/card"

const Preview = () => {
    return (
        <Layout>
            <Router basepath="/preview">
                <SectionPreview path="/section/:entryId" />
                <ActionPreview path="/action/:entryId" />
                <CardPreview path="/card/:entryId" />
                {/* Todo handle default routes */}
                {/*<Default path="/" /> */}
            </Router>
        </Layout>
    )
}

export default Preview
