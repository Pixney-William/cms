<template>
    <div class="checkboxes-fieldtype-wrapper"  :class="{'inline-mode': config.inline}">
        <div class="option" v-for="(option, $index) in options" :key="$index">
            <input type="checkbox"
                   :name="name + '[]'"
                   :id="name + $index"
                   :value="option.value"
                   :disabled="isReadOnly"
                   v-model="values"
            />
            <label :for="name + $index">{{ option.label || option.value }}</label>
        </div>
    </div>
</template>

<script>
import HasInputOptions from './HasInputOptions.js'

export default {

    mixins: [Fieldtype, HasInputOptions],

    data() {
        return {
            values: this.value || []
        }
    },

    computed: {
        options() {
            return this.normalizeInputOptions(this.config.options);
        },

        replicatorPreview() {
            return this.values.map(value => {
                const option = _.findWhere(this.options, { value });
                return option ? option.label : value;
            }).join(', ');
        },
    },

    watch: {

        values(values, oldValues) {
            values = this.sortValues(values);

            if (JSON.stringify(values) === JSON.stringify(oldValues)) return;

            this.update(values);
        },

        value(value) {
            this.values = this.sortValues(value);
        }

    },

    methods: {

        focus() {
            document.getElementById(`${this.name}-0`).focus();
        },

        sortValues(values) {
            if (!values) return [];

            return this.options
                .filter(opt => values.includes(opt.value))
                .map(opt => opt.value);
        }

    }
};
</script>
