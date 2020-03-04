import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import SectionPreview from "../components/preview/section"
import ActionPreview from "../components/preview/action"

const Preview = () => {
    return (
        <Layout>
            <Router basepath="/preview">
                <SectionPreview path="/section/:entry_id" />
                <ActionPreview path="/action/:entry_id" />
                {/* Todo handle default routes */}
                {/*<Default path="/" /> */}
            </Router>
        </Layout>
    )
}

export default Preview