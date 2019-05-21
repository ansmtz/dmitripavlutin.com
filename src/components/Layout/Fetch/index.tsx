import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import LayoutContainer from 'components/Layout/Container';

interface LayoutContainerProps {
  children: React.ReactNode;
}

export default class LayoutFetch extends React.Component<LayoutContainerProps> {
  public render() {
    return (
      <StaticQuery
        query={graphql`
          query GatsbyImageSampleQuery {
            file(relativePath: { eq: "profile-picture.jpg" }) {
              childImageSharp {
                # Specify the image processing steps right in the query
                # Makes it trivial to update as your page's design changes.
                resolutions(width: 64, height: 64, quality: 100) {
                  ...GatsbyImageSharpResolutions
                }
              }
            }
            site {
              siteMetadata {
                ...SiteMetadataAll
              }
            }
          }
        `}
        render={this.renderContent}
      />
    );
  }

  public renderContent = ({ site: { siteMetadata }, file }: { site: { siteMetadata: SiteMetadata }; file: any }) => {
    const { children } = this.props;
    return (
      <LayoutContainer siteMetadata={siteMetadata} profilePicture={file.childImageSharp.resolutions}>
        {children}
      </LayoutContainer>
    );
  };
}