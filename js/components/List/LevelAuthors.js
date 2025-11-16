export default {
    props: {
        author: {
            type: String,
            required: true,
        },
        creators: {
            type: Array,
            required: true,
        },
        verifier: {
            type: String,
            required: true,
        },
    },
    template: `
        <div class="level-authors">

            <!-- AUTHOR -->
            <div class="type-title-sm">Author:</div>
            <p class="type-body">
                <span>{{ clean(author) }}</span>
                <img v-if="isCBF(author)" 
                     src="/images/logo.png" 
                     class="cbf-icon"
                     title="Uses CBF"
                     @click="$emit('cbf')">
            </p>

            <!-- CREATORS -->
            <template v-if="creators.length > 0">
                <div class="type-title-sm">Creator:</div>
                <p class="type-body">
                    <template 
                        v-for="(creator, index) in creators" 
                        :key="'creator-' + creator">
                        
                        <span>{{ clean(creator) }}</span>
                        <img v-if="isCBF(creator)" 
                             src="/images/logo.png" 
                             class="cbf-icon"
                             title="Uses CBF"
                             @click="$emit('cbf')">

                        <span v-if="index < creators.length"> </span>
                    </template>
                </p>
            </template>

            <!-- VERIFIER -->
            <div class="type-title-sm">Verifier:</div>
            <p class="type-body">
                <span>{{ clean(verifier) }}</span>
                <img v-if="isCBF(verifier)" 
                     src="/images/logo.png" 
                     class="cbf-icon"
                     title="Uses CBF"
                     @click="$emit('cbf')">
            </p>

        </div>
    `,

    computed: {
        selfVerified() {
            return this.author === this.verifier && this.creators.length === 0;
        }
    },

    methods: {
        // Detect "(cbf)" in name
        isCBF(name) {
            if (!name) return false;
            return name.toLowerCase().includes("(cbf)");
        },

        // Clean display name
        clean(name) {
            return name.replace(/\(cbf\)/ig, "").trim();
        }
    }
};
