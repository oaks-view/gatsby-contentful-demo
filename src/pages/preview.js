import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import SectionPreview from "../components/preview/section"
// import Details from "../components/Details"
// import Login from "../components/Login"
// import Default from "../components/Default"

const Preview = () => {
    return (
        <Layout>
            <Router basepath="/preview">
                <SectionPreview path="/section" />
                {/* Todo handle default routes */}
                {/*<Default path="/" /> */}
            </Router>
        </Layout>
    )
}

export default Preview