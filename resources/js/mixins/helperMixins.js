export default {
    methods : {
        slugify(text) {
            return text
              .toString()
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^\w\-]+/g, '')
              .replace(/\-\-+/g, '-')
              .replace(/^-+/, '')
              .replace(/-+$/, '')
              .replace(/[\s_-]+/g, '-');
          },
    }
}
