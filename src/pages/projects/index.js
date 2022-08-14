import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../../components/Layout'
import { portfolio, proj } from '../../styles/projects.module.css'
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function Projects({ data }) {
    console.log(data)
    const projects = data.projects.nodes
    const contact = data.contact.siteMetadata.contact

    return (
        <Layout>
            <div className={portfolio}>
                <h2>Portfolio</h2>
                <h3>Projects & Websites I've Created</h3>
                <div className={proj}>
                    {projects.map(project => (
                        <Link to={"/projects/" + project.frontmatter.slug} key={project.id}>
                            <div>
                                <GatsbyImage image={project.frontmatter.thumb.childImageSharp.gatsbyImageData} alt="project image" />
                                <h3>{project.frontmatter.title}</h3>
                                <p>{project.frontmatter.stack}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <p>Like what you see? Email me {contact} for a quote!</p>
            </div>
        </Layout>
    )
}

// export page query
export const query = graphql`
  query ProjectsPage {
    projects: allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
        nodes {
          frontmatter {
            slug
            stack
            title
            thumb {
                childImageSharp {
                    gatsbyImageData
                }
              }
          }
        }
      }
    contact: site {
        siteMetadata {
            contact
        }
    }  
  }
`
