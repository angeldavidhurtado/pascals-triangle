document.addEventListener('contextmenu', e => e.preventDefault())
	
class Tooltip {
	constructor() {
		this.tagTooltip = this.createTagTooltip()
		document.addEventListener('mousemove', this.onHoverShowTooltip)
		document.addEventListener('touchstart', this.handleTouchStart)

		this.tagIsHidden = true
		const tagTriangle = document.getElementById('triangle')
		this.triangleRows = tagTriangle.childNodes
		document.getElementById('add').addEventListener('click', () => this.showTooltip())
		document.getElementById('delete').addEventListener('click', () => {
			if (this.tag) {
				const len = this.triangleRows.length
				const lastRowTriangle = this.triangleRows[len-1]
				if (lastRowTriangle == this.tag.parentNode) {
					this.tag = null
					this.tagTooltip.style.display = 'none'
					this.tagIsHidden = true
				}
			}
			setTimeout(this.showTooltip, 300)
		})
		window.addEventListener('resize', () => this.showTooltip())
	}


	onHoverShowTooltip = e => {
		if (this.isTouchDevice()) return
		const tag = e.target
		if (this.tag == tag) return
		const value = tag?.value
		this.tagIsHidden = true
		if (!value) return this.tagTooltip.style.display = 'none'
		this.tagIsHidden = false
		this.showTooltip(e.target)
	}


	handleTouchStart = e => {
		const value = e.target?.value
		if (!value) return
		this.tagIsHidden = false
		this.showTooltip(e.target)
	}


	isTouchDevice = () => {
		return 'ontouchstart' in window || navigator.maxTouchPoints > 0
	}


	createTagTooltip = () => {
		const tagTooltip = document.createElement('div')
		tagTooltip.className = 'tooltip'
		document.body.appendChild(tagTooltip)
		return tagTooltip
	}


	showTooltip = (tag=null) => {
		if (this.tagIsHidden) return
		this.calculatePosition(tag)
		this.tagTooltip.innerText = this.tag.value
		this.tagTooltip.style.display = 'block'
		this.tagTooltip.style.transform = `translate(${this.x}px, ${this.y}px)`
	}


	calculatePosition = (tag=null) => {
		if (this.tagIsHidden) return
		this.tag = tag ? tag : this.tag
		const rect = this.tag.getBoundingClientRect()
		this.x = rect.left + window.scrollX + 40
		this.y = rect.top + window.scrollY + 48
	}
}


document.addEventListener('DOMContentLoaded', () => {
	const tooltip = new Tooltip()
})
